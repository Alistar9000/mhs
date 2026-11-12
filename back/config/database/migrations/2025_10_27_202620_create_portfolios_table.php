<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('portfolios', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('national_code', 20)->unique();
            $table->string('phone', 30)->nullable();
            $table->text('address')->nullable();
            $table->string('broker_link')->nullable();
            $table->string('broker_username')->nullable();
            $table->text('broker_password')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('portfolios');
    }
};
