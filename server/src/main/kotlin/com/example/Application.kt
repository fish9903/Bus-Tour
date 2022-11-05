package com.example

import com.example.entity.dbTest
import io.ktor.server.application.*
import com.example.plugins.*

fun main(args: Array<String>){
    dbTest("id","passsword", "test")
    //io.ktor.server.netty.EngineMain.main(args)
}

@Suppress("unused") // application.conf references the main function. This annotation prevents the IDE from marking it as unused.
fun Application.module() {
    configureSerialization() // json 다루기
    configureRouting() // routing 다루기
}
