<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class EnviarTokenMail extends Mailable {
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    protected $tokenActivacion;

    public function __construct($tokenActivacion) {
        $this->tokenActivacion = $tokenActivacion;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build() {
        return $this->view('correos.activar-cuenta')->with('token', $this->tokenActivacion);
    }
}
