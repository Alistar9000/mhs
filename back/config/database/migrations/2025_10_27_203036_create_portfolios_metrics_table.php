<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('portfolios_metrics', function (Blueprint $table) {
            $table->id();
            $table->foreignId('portfolio_id')->constrained('portfolios')->onDelete('cascade');
            $table->bigInteger('portfolio_value')->default(0);
            $table->bigInteger('return_amount')->default(0);
            $table->decimal('return_percent', 10, 2)->default(0);
            $table->bigInteger('manager_share')->default(0);
            $table->timestamps();
            $table->unique('portfolio_id');
        });
    }

    public function down()
    {
        Schema::dropIfExists('portfolios_metrics');
    }
};
