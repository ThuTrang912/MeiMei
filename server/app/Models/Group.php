<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;

class Group extends Model
{
    use HasApiTokens, HasFactory, Notifiable;
    use SoftDeletes; // 論理削除の場合

    protected $table ='group';
    protected $primaryKey='group_id';
    protected $fillable = [
        'group_id',
        'group_name',
        'id_card',
    ];
}
