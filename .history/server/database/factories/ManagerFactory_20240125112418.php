<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ManagerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'id_card' => $this->faker->unique()->randomNumber(6),
            // 'status' => $this->faker->randomElement(['usable', 'unusable']),
        ];
    }
}
