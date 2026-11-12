<?php
namespace App\Http\Controllers;

use App\Models\WatchList;
use App\Models\Symbol;
use Illuminate\Http\Request;

class WatchListController extends Controller
{

  public function index(Request $request)
{
    $type = $request->query('type');
    $list = WatchList::with('symbol')->where('type',$type)->get();
    
    // تبدیل هر آیتم
    $transformed = $list->map(function ($item) {
        $symbol = $item->symbol;
        
        return [
            // فیلدهای اصلی
            'id' => $item->id,
            'symbol_code' => $item->symbol_code,
            'target1' => $item->target1,
            'target2' => $item->target2,
            'created_at' => $item->created_at,
            'updated_at' => $item->updated_at,
            
            // فیلدهای از symbol
            'symbol' => $symbol->name ?? null,
            'price' => $symbol->last_price ?? null,
            'price_percent' => $symbol->last_price_pct ?? null,
            
            // محاسبات
            'target1_dis' => $this->calculateDis($symbol, $item->target1),
            'target2_dis' => $this->calculateDis($symbol, $item->target2),
        ];
    });
    
    return response()->json($transformed);
}

private function calculateDis($symbol, $target)
{
    if (!$symbol || !$symbol->last_price || !$target || $target == 0) {
        return null;
    }
    
   $t = ($target - $symbol->last_price) / $symbol->last_price;
   if($t >= 2){
       return [round($t),round($t * 100)];
   }
   else{
       
   $t = floor($t * 100) / 100 + 1;
   return [number_format($t, 2),round($t * 100)];
   }
}
   public function create(Request $request)
{
    $req = $request->all();
   
   // آماده‌سازی داده‌ها
    //  return response()->json(
    // $list
    // );
    // return;
    $data = [];
    foreach ($req['list'] as $item) {
        $symbol = Symbol::where('name', $item['symbol'])->first();
        if ($symbol) {
            $data[] = [
                'symbol_code' => $symbol->code,
                'target1' => $item['target1'] ?? null,
                'target2' => $item['target2'] ?? null,
                'type'    => $req['type'],
            ];
        }
    }
   
    // روش پیشنهادی: استفاده از upsert
    WatchList::upsert(
        $data,
        ['symbol_code','type'], // ستون‌های کلید
        ['target1', 'target2'] // ستون‌های قابل به‌روزرسانی
    );
    
    return response()->json([
        'message' => 'Watchlist updated successfully',
        'count' => count($data)
    ]);
}
   public function edit(Request $request,$code){
       $payload = $request->all();
       
      try {
        //code...
          $list = WatchList::where('symbol_code',$code)->where('type',$payload['type'])->first();
      $list->target1 = $payload['list']['target1'];
      $list->target2 = $payload['list']['target2'];
      $list->save();
      return response()->json(['update' => 'ok']);
      } catch (\Throwable $th) {
        return response()->json(['update' => 'failed']);
        //throw $th;
      }
    

   }
   public function delete(Request $request,$code){
    $type = $request->query('type');
 try {
       
        WatchList::where('symbol_code',$code)->where('type',$type)->delete();
       return response()->json('ok');
 } catch (\Throwable $th) {
   
    return response()->json('failed');
 }
   }
}