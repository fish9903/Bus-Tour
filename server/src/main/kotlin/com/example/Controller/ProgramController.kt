package com.example.Controller

import com.example.entity.Program
import com.example.entity.ProgramEntity
import org.jetbrains.exposed.sql.transactions.transaction

class ProgramController {
    fun getAll(): Iterable<Program> = transaction{
        ProgramEntity.all().map(ProgramEntity::getProgram)
    }
}