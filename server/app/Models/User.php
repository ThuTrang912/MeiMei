<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;



class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    use SoftDeletes; // 論理削除の場合


    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    protected $table = 'user';
    protected $primaryKey = 'id_card';
    //khai báo các cột có thể đổi được dữ liệu
    protected $fillable = [
        'id_card',
        'user_name',
        'furigana',
        'email',
        'password',
        'gender',
        'birthday',
        'tel',
        'post_code',
        'address',
        'img_url',
        'instagram',
        'x',
        'description',
        'group_id',
        'registration_allowed',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',

    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
