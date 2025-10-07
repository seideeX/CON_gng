<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Candidate;

class CandidateSeeder extends Seeder
{
    public function run(): void
    {
        $femaleCandidates = [
            ['Elsie', 'Valdez', 'Computer Science'],
            ['Nicole Kim', 'Paguirigan', 'Information Technology'],
            ['Andrea Leigh', 'Fernandez', 'Nursing'],
            ['Kenneth Clier', 'Bunagan', 'Accountancy'],
            ['Ma. Kathleen Joyce', 'Cabanlong', 'Business Administration'],
            ['Simran', 'Lola', 'Psychology'],
            ['Sharah Mayne', 'Mendieta', 'Marketing'],
            ['Monique Laurose', 'Evangelista', 'Hospitality Management'],
            ['Ashleigh Zea', 'Bartolome', 'Engineering'],
            ['Precious Nhickole', 'Zipagan', 'Education'],
            ['Gracielle', 'Perez', 'Tourism'],
        ];

        $maleCandidates = [
            ['Ervin', 'Tabliago', 'Computer Science'],
            ['Jhon Mar', 'Domingo', 'Information Technology'],
            ['Francis', 'Sabado', 'Engineering'],
            ['Jieson', 'Angangan', 'Accountancy'],
            ['Deejhay', 'Mabborang', 'Marketing'],
            ['Prince Jian', 'Castillo', 'Psychology'],
            ['Prince Gian', 'Ladimo', 'Business Administration'],
            ['Joven', 'Tabliago', 'Tourism'],
        ];

        // Female candidates with numbered images
        foreach ($femaleCandidates as $index => $candidate) {
            Candidate::create([
                'first_name'    => $candidate[0],
                'last_name'     => $candidate[1],
                'gender'        => 'female',
                'course'        => $candidate[2],
                'profile_img'   => "candidates/female/" . ($index + 1) . ".jpg",
            ]);
        }

        // Male candidates with numbered images
        foreach ($maleCandidates as $index => $candidate) {
            Candidate::create([
                'first_name'    => $candidate[0],
                'last_name'     => $candidate[1],
                'gender'        => 'male',
                'course'        => $candidate[2],
                'profile_img'   => "candidates/male/" . ($index + 1) . ".jpg",
            ]);
        }
    }
}
