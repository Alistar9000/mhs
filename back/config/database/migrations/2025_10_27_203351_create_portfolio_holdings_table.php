<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('portfolio_holdings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('portfolio_id')->constrained('portfolios')->onDelete('cascade');
            $table->string('symbol_code', 20);
            $table->foreign('symbol_code')->references('code')->on('symbols')->onDelete('cascade');
            $table->bigInteger('quantity')->default(0);
            $table->timestamps();
            $table->unique(['portfolio_id', 'symbol_code']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('portfolio_holdings');
    }
};
