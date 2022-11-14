package com.example

import com.example.entity.dbTest
import io.ktor.server.application.*
import com.example.plugins.*

// password는 비밀
fun main(args: Array<String>){
    dbTest("admin","", "test")
//    io.ktor.server.netty.EngineMain.main(args)
}

@Suppress("unused") // application.conf references the main function. This annotation prevents the IDE from marking it as unused.
fun Application.module() {
    configureSerialization() // json 다루기
    configureRouting() // routing 다루기
}
