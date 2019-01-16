<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNotesDatasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notes_datas', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->string("title")->nullable();
            $table->string("note")->nullable();
            $table->string("reminder")->nullable();
            $table->string("color")->nullable();
            $table->boolean("pin")->default(0);
            $table->boolean("archive")->default(0);
            $table->boolean("trash")->default(0);
            $table->string("note_index");
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
        Schema::dropIfExists('notes_datas');
    }
}
