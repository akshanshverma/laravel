<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\User;

class PasswordTest extends TestCase
{
    /**
     * test password reset create password reset request
     *
     * @return void
     */
    public function testPasswordResetRequest()
    {
        $user = factory(User::class)->create();
        $email = $user->email;
        $response = $this->json(
            'POST',
            'api/password/create',
            ['email' => $email]
        );
        $response->assertStatus(200);
    }

    /**
     * test if email is not in database
     *
     * @return void
     */
    public function testPasswordResetRequestForValidMail()
    {
        $response = $this->json(
            'POST',
            'api/password/create',
            ['email' => 'abcdabgha@ahha.com']
        );
        $response->assertStatus(205);
    }
}
