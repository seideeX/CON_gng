<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Candidate;

class CandidateSeeder extends Seeder
{
    public function run(): void
    {
        $femaleCandidates = [
            ['Beverly', 'Batara'],
            ['Neslyne', 'Arellano'],
            ['Donnamie', 'Bernardo'],
            ['Wyndae', 'Queddeng'],
            ['Maryia Virginnie Yna', 'Rodriguez'],
            ['Clarise', 'Malsi'],
            ['Shezel', 'Solita'],
            ['Erwei Marie', 'Tamares'],
            ['Apple Mae', 'Jamon'],
        ];

        $maleCandidates = [
            ['Xyrickz', 'Paguirigan'],
            ['Omar', 'Jovillanos'],
            [],
            ['Jedric', 'Magauay'],
            ['John Carlo', 'Carasi'],
            ['John Emmanuel', 'Tacac'],
            [],
            ['Lordwin Cristian', 'Culili'],
            ['Ian Mart', 'Bumagat'],
        ];

        // Female candidates with numbered images and candidate_number
        foreach ($femaleCandidates as $index => $candidate) {
            if (empty($candidate[0])) {
                continue;
            }
            Candidate::create([
                'first_name'      => $candidate[0],
                'last_name'       => $candidate[1],
                'gender'          => 'female',
                'course'          => 'Bachelor of Science in Nursing',
                'profile_img'     => "candidates/female/" . ($index + 1) . ".jpg",
                'candidate_number' => $index + 1,
            ]);
        }

        // Male candidates with numbered images and candidate_number
        foreach ($maleCandidates as $index => $candidate) {
            if (empty($candidate[0])) {
                continue;
            }
            Candidate::create([
                'first_name'      => $candidate[0],
                'last_name'       => $candidate[1],
                'gender'          => 'male',
                'course'          => 'Bachelor of Science in Nursing',
                'profile_img'     => "candidates/male/" . ($index + 1) . ".jpg",
                'candidate_number' => $index + 1,
            ]);
        }
    }
}
