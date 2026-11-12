<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('portfolio_value_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('portfolio_id')->constrained('portfolios')->onDelete('cascade');
            $table->bigInteger('value')->default(0);
            $table->decimal('return',10,2)->default(0);
            $table->date('date');
            $table->timestamps();
            $table->unique(['portfolio_id','date']);
            $table->index(['portfolio_id','date']);
            $table->index('date');
        });
    }

    public function down()
    {
        Schema::dropIfExists('portfolio_value_histories');
    }
};
