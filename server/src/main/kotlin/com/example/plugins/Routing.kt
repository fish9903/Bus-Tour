package com.example.plugins

import io.ktor.server.application.*
import io.ktor.server.routing.*
import courseRoute

fun Application.configureRouting() {
    routing {
        courseRoute()
    }
}