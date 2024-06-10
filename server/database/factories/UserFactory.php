<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\User;

class UserFactory extends Factory
{
    protected $model = User::class;
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'id_card' => $this->faker->randomNumber(6),
            'user_name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'gender' => $this->faker->randomElement(['male', 'female', 'other']),
            'password' => bcrypt('password'), // password
            'birthday' => $this->faker->date(),
        ];
    }

//     /**
//      * Indicate that the model's email address should be unverified.
//      *
//      * @return \Illuminate\Database\Eloquent\Factories\Factory
//      */
//     public function unverified()
//     {
//         return $this->state(function (array $attributes) {
//             return [
//                 'email_verified_at' => null,
//             ];
//         });
//     }
}
