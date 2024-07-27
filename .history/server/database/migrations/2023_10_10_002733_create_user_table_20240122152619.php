<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user', function (Blueprint $table) {
            $table->string('id_card')->primary();
            $table->string('user_name');
            $table->string('furigana')->nullable();
            $table->date('birthday');
            $table->string('gender');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('tel')->nullable();
            $table->string('post_code')->nullable();
            $table->string('address')->nullable();
            $table->string('img_url')->nullable();
            $table->string('instagram')->nullable();
            $table->string('x')->nullable();
            $table->text('description')->nullable();
            $table->boolean('registration_allowed')->default(true);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
            $table->softDeletes(); // カラム名の初期値は、deleted_at
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user');
    }
}
