<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('portfolios_financials', function (Blueprint $table) {
            $table->id();
            $table->foreignId('portfolio_id')->constrained('portfolios')->onDelete('cascade');
            $table->bigInteger('initial_capital')->default(0);
            $table->unsignedInteger('commission_pct')->default(0);
            $table->date('contract_date')->nullable();
            $table->date('due_date')->nullable();
            $table->enum('guarantee_type', ['promissory','quarterly']);
            $table->bigInteger('dividend')->default(0);
            $table->bigInteger('withdrawals')->default(0);
            $table->timestamps();
            $table->unique('portfolio_id');
        });
    }

    public function down()
    {
        Schema::dropIfExists('portfolios_financials');
    }
};
