package com.example.Controller

import com.example.entity.User
import com.example.entity.UserEntity
import com.example.entity.Users
import org.jetbrains.exposed.sql.and
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.transactions.transaction

class UserController {
    fun addUser(username: String, phone_number: String): UserEntity = transaction {

        val existingUser = UserEntity.find{(Users.name eq username) and (Users.phone_number eq phone_number) }.limit(1).find { it.name == username };

        println(existingUser)
        if(existingUser != null){
            return@transaction existingUser;
        }

        val user = UserEntity.new {
                this.name = username
                this.phone_number = phone_number
            }
        return@transaction user;
    }
    fun getAll(): Iterable<User> = transaction {
        UserEntity.all().map(UserEntity::getUser)
    }
}