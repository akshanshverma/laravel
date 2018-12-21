<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\User;
use App\PasswordReset;

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


    /**
     * test find token function is working or not 
     *
     * @return void
     */
    public function testFindResetPasswordToken()
    {
        $user = factory(User::class)->create();
        $email = $user->email;
        $this->json(
            'POST',
            'api/password/create',
            ['email' => $email]
        );
        $passwordResetDetails = PasswordReset::where('email', $email)->first();

        $response = $this->get('api/password/find/' . $passwordResetDetails->token);
        $response->assertStatus(200);
    }


    /**
     * test find token function when token is not in database
     *
     * @return void
     */
    public function testFindResetPasswordTokenIfNotP()
    {
        $response = $this->get('api/password/find/bdkdsajdhsaidhasdhiasidhauihdsuiasbdkjas');
        $response->assertStatus(220);
    }

    /**
     * test reset password function is working or not after get token
     *
     * @return void
     */
    public function testResetPassword()
    {
        $user = factory(User::class)->create();
        $email = $user->email;
        $this->json(
            'POST',
            'api/password/create',
            ['email' => $email]
        );
        $passwordResetDetails = PasswordReset::where('email', $email)->first();
        $response = $this->json(
            'POST',
            'api/password/reset',
            [
                'email' => $email,
                'token' => $passwordResetDetails->token,
                'password' => '123456',
            ]
        );
        $response->assertStatus(200);
    }
    /**
     * test reset password function for invalid token
     *
     * @return void
     */
    public function testResetPasswordInvalidToken()
    {
        $response = $this->json(
            'POST',
            'api/password/reset',
            [
                'email' => 'sankjsdbashd@gmail.com',
                'token' => 'cdfxscfdsbhjcbdshjbcghjsbdsbhjdsbhjabdhjs',
                'password' => '123456',
            ]
        );
        $response->assertStatus(205);
    }
}
