<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\User;
use Illuminate\Support\Facades\Hash;


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
            $table->string('id_card');
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
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
            $table->softDeletes(); // カラム名の初期値は、deleted_at
            // Foreign key
            $table->foreign('id_card')->references('id_card')->on('manager')->onDelete('cascade');
        });

            // Thêm giá trị vào bảng sau khi tạo
        User::create([
            'id_card' => '111111',
            'user_name' => 'admin', // Hoặc giá trị mặc định khác
            'birthday' => '2023-01-01', // Hoặc giá trị mặc định khác
            'gender' => 'other', // Hoặc giá trị mặc định khác
            'password' => Hash::make('admin'), // Hoặc giá trị mặc định khác
            'email' => 'meimei@gmail.com', // Hoặc giá trị mặc định khác
        ]);
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
