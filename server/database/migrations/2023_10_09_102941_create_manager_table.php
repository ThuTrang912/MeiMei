<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Manager;


class CreateManagerTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('manager', function (Blueprint $table) {
            $table->string('id_card')->primary();
            $table->boolean('status')->default(true);
            $table->string('role')->default('user');
            $table->timestamps(); // Add this line to create created_at and updated_at columns
            $table->softDeletes(); // The default column name is 'deleted_at'
        });

        // Thêm giá trị vào bảng sau khi tạo
        Manager::create([
            'id_card' => '111111',
            'status' => false, // Hoặc giá trị mặc định khác
            'role' => 'admin', // Hoặc giá trị mặc định khác
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('manager');
    }
}
