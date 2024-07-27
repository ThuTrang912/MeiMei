<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Manager extends Model
{
    use HasFactory;
    use SoftDeletes; // 論理削除の場合
    protected $table = 'manager';
    protected $fillable = [
        'id_card',
        'status',
    ];
}
