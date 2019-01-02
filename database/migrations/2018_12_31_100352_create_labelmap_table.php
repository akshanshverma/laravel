<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLabelmapTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('labelmap', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('label_id');
            $table->foreign('label_id')->references('id')->on('labels')->onDelete('cascade');
            $table->unsignedInteger('note_id');
            $table->foreign('note_id')->references('id')->on('notes_datas');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('labelmap');
    }
}
