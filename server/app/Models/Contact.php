<?php
namespace App\Models;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Contact extends Model
{
    use HasApiTokens, HasFactory, Notifiable;
    use SoftDeletes; // 論理削除の場合

    protected $table = 'contact';
    protected $primaryKey = 'id_card';
    protected $fillable = [
        'id_card',
        'contact_id',
        'like',
        'notification',
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
