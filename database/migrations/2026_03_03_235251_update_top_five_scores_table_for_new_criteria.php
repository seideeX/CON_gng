<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('top_five_scores', function (Blueprint $table) {
            // Drop old columns
            $table->dropColumn(['face_and_figure', 'delivery', 'overall_appeal']);
            
            // Add new columns for Preliminary Round
            $table->json('preliminary_round')->nullable();
            $table->decimal('preliminary_round_total', 8, 2)->default(0);
            
            // Add new columns for Final Round
            $table->json('final_round')->nullable();
            $table->decimal('final_round_total', 8, 2)->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('top_five_scores', function (Blueprint $table) {
            // Drop new columns
            $table->dropColumn(['preliminary_round', 'preliminary_round_total', 'final_round', 'final_round_total']);
            
            // Restore old columns
            $table->decimal('face_and_figure', 8, 2)->nullable();
            $table->decimal('delivery', 8, 2)->nullable();
            $table->decimal('overall_appeal', 8, 2)->nullable();
        });
    }
};
