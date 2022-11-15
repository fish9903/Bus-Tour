package com.example.entity

import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.transactions.transaction
import java.time.LocalDateTime

/**
 * 데이터베이스가 정상적으로 연결되었는지 평가하기 위한 단순한 함수.
 * dbname에 대응되는 데이터베이스는 로컬 환경 상에 사전 준비되어 있어야 합니다.
 * @param id 데이터베이스 id
 * @param password 데이터베이스 비밀번호
 * @param dbname 데이터베이스 이름
 */
fun dbTest(id: String, password: String, dbname: String)
{
    Database.connect(
        "jdbc:mysql://bustour.cpimteab28le.us-east-1.rds.amazonaws.com:3306/$dbname", "com.mysql.cj.jdbc.Driver",
        user = "$id", password = "$password"
    )

//    transaction {
//        SchemaUtils.drop(Orders, Personinfos, Programs, Users, Courses, Priceinfos)
//        SchemaUtils.create(Orders, Personinfos, Programs, Users, Courses, Priceinfos)
//    }
//        val order = OrderEntity.new {
//            ordered_date = LocalDateTime.now()
//            state = "ok"
//            QRCode = "https://www.naver.com"
//        }
//    }
//
//    transaction {
//        var order = OrderEntity.all().first()
//        val personInfo1 = PersonInfoEntity.new {
//            type = "child"
//            number = 13
//            oid = order
//        }
//
//        val personInfo2 = PersonInfoEntity.new {
//            type = "adult"
//            number = 20
//            oid = order
//        }
//    }

//    transaction {
//        val order = OrderEntity.all().first().getOrder()
//        val jsonOrder = Json.encodeToString(order) // json으로 반환하는 방법
//        println(jsonOrder)
//    }
}