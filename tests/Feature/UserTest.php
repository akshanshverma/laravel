<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\User;
use Faker\Factory as Faker;
use Laravel\Passport\Passport;


class UserTest extends TestCase
{
    /**
     * test user login page
     *
     * @return void
     */
    public function testLoginPage()
    {
        $response = $this->get('/login');

        $response->assertStatus(200);
    }

    /**
     * test user can login or not
     * 
     *  @return void
     */
    public function testUserLogin()
    {
        $response = $this->json(
            'POST',
            '/api/login',
            ['email' => 'akshansh.verma01@gmail.com', 'password' => '123456']
        );
        $response->assertStatus(200);
    }

    /**
     * test unknown  user can't login 
     * 
     *  @return void
     */
    public function testUserLoginAuth()
    {
        $response = $this->json(
            'POST',
            '/api/login',
            ['email' => 'akshansh.verma01@gmail.com', 'password' => '11111111']
        );
        $response->assertStatus(220);
    }

    /**
     * test registration page is working or not
     * 
     *  @return void
     */
    public function testRegisterPage()
    {
        $response = $this->get('/register');
        $response->assertStatus(200);
    }

    /**
     * test user registration working or not 
     * 
     *  @return void
     */
    public function testUserRegistration()
    {
        $faker = Faker::create();
        $response = $this->json(
            'POST',
            '/api/register',
            ['username' => $faker->name, 'email' => $faker->unique()->safeEmail, 'password' => '123456', 'rpassword' => '123456']
        );
        $response->assertStatus(200);

    }

    /**
     * test user registration validation is working or not 
     * 
     *  @return void
     */

    public function testUserRegistrationValidation()
    {
        $response = $this->json(
            'POST',
            '/api/register',
            ['username' => 'akku', 'email' => 'akshansh.verma01@gmail.com', 'password' => '123456', 'rpassword' => '123456']
        );
        $response->assertStatus(210)->assertJsonValidationErrors(['email']);
    }

    /**
     * test user data access 
     * 
     *  @return void
     */

    public function testGetUserData()
    {
        $user = User::where('email', 'akshansh.verma01@gmail.com')->first();
        Passport::actingAs($user);

        $response = $this->get('/api/getDetails');
        $response->assertStatus(200);
    }

    /**
     * test get unauthorise user details 
     * 
     *  @return void
     */

    public function testGetUnauthorisedUserDetail()
    {
        $response = $this->get('/api/getDetails');
        $response->assertStatus(302);
    }

    /**
    *test email verification at the time of registration
    *
    * @return void
    */

    public function testEmailVerification()
    {
        $faker = Faker::create();
        $email = $faker->unique()->safeEmail;
        $response = $this->json(
            'POST',
            '/api/register',
            ['username' => $faker->name, 'email' => $email, 'password' => '123456', 'rpassword' => '123456']
        );

        $user = User::where('email',$email)->first();
        $token = $user->token;
        $response = $this->get('/api/verifymail/'.$token);
        $response->assertStatus(201);  
    }

    /**
     * test if user is already verify
     * 
     *  @return void
     */

    public function testUserVerificationDone()
    {
        $faker = Faker::create();
        $email = $faker->unique()->safeEmail;
        $response = $this->json(
            'POST',
            '/api/register',
            ['username' => $faker->name, 'email' => $email, 'password' => '123456', 'rpassword' => '123456']
        );

        $user = User::where('email',$email)->first();
        $token = $user->token;
        $response = $this->get('/api/verifymail/'.$token);
        $response = $this->get('/api/verifymail/'.$token);
        $response->assertStatus(222);  
    }
}
