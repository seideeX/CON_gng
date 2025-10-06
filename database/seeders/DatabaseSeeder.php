<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Candidate;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create 1 admin
        User::factory()->create([
            'name' => 'Reycarl',
            'email' => 'reycarl@gmail.com',
            'password' => Hash::make('123'),
            'role' => 'admin',
        ]);

        // Create 5 judges
        User::factory()->count(5)->sequence(
            fn ($sequence) => [
                'name' => 'judge_' . ($sequence->index + 1),
                'email' => 'judge' . ($sequence->index + 1) . '@gmail.com',
                'password' => Hash::make('123'),
                'role' => 'judge',
            ]
        )->create();

        // Create 5 male candidates
        Candidate::factory()->count(5)->state(['gender' => 'male'])->create();

        // Create 5 female candidates
        Candidate::factory()->count(5)->state(['gender' => 'female'])->create();
    }
}