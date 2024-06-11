<?php
namespace App\Models;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Company extends Model
{
    use HasApiTokens, HasFactory, Notifiable;
    use SoftDeletes; // 論理削除の場合

    protected $table ='company';
    protected $primaryKey='id_card';
    protected $fillable = [
        'id_card',
        'com_name',
        'com_tel',
        'com_fax',
        'com_email',
        'com_post_code',
        'com_address',
        'department',
        'position',
        'website',
    ];
}
