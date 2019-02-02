<?php

namespace App\Mail;

use App\Suscripcion;
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
    public $sus;

    public function __construct($tokenActivacion,Suscripcion $sus) {
        $this->tokenActivacion = $tokenActivacion;
        $this->sus=$sus;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build() {
        return $this->view('correos.activar-cuenta')
            ->subject('Gracias por Registrarte')
            ->with('token', $this->tokenActivacion);
    }
}
