<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\User;
use Laravel\Passport\Passport;

class NotesTest extends TestCase
{
    /**
     * test valid user can create notes
     *
     * @return void
     */
    public function testCreatNote()
    {
        $user = factory(User::class)->create();
        Passport::actingAs($user);
        $response = $this->json(
            'POST',
            'api/createnote',
            [
                'title' => 'test',
                'note' => 'test test test',
                'reminder' => '',
            ]
        );
        $response->assertStatus(200);
    }

     /**
     * test user can create note without authentication
     *
     * @return void
     */
    public function testCreatNoteWithoutAuthentication()
    {
        $user = factory(User::class)->create();
        $response = $this->json(
            'POST',
            'api/createnote',
            [
                'title' => 'test',
                'note' => 'test test test',
                'reminder' => '',
            ]
        );
        $response->assertStatus(401);
    }

     /**
     * test get all notes
     *
     * @return void
     */
    public function testGetAllNotes()
    {
        $user = factory(User::class)->create();
        Passport::actingAs($user);
        $this->json(
            'POST',
            'api/createnote',
            [
                'title' => 'test',
                'note' => 'test test test',
                'reminder' => '',
            ]
        );

        $response = $this->get('api/getAllNotes');
        $response->assertStatus(200);
    }
}
