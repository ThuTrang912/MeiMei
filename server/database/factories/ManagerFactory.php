<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Manager;

class ManagerFactory extends Factory
{
    protected $model = Manager::class;
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
