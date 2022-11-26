package com.example.Controller

import com.example.entity.*
import org.jetbrains.exposed.dao.with
import org.jetbrains.exposed.sql.transactions.transaction
import java.time.LocalDateTime

class OrderController {
    // order 추가
    fun addOrder(order: Order, programId: Int, userName: String): OrderEntity = transaction {
        val user = UserEntity.find{ Users.name eq userName}.find{ it.name == userName }!!
        val newOrder = OrderEntity.new {
            this.ordered_date = LocalDateTime.now()
            this.up_date = LocalDateTime.now()
            this.state = order.state
            this.QRCode = order.QRcode
            this.total_price = order.total_price
            this.card_number = order.card_number
            this.program = ProgramEntity.findById(programId)!!
            this.user = user
        }

        // personinfo 생성
        val size: Int = order.personinfos.size
        var personCount: Int = 0
        for (i: Int in 0 until size){
            PersoninfoEntity.new {
                this.type = order.personinfos[i].type
                this.count = order.personinfos[i].count
                this.price_pp = order.personinfos[i].price_pp
                this.oid = OrderEntity.findById(newOrder.id)!!
            }
            personCount += order.personinfos[i].count
        }

        // 남은 좌석 감소
        val program = ProgramEntity.findById(programId)
        if (program != null) {
            program.rem_count = program.rem_count - personCount
        }

        return@transaction newOrder
    }

    fun getAll(): Iterable<Order> = transaction {
        OrderEntity.all().with(
            OrderEntity::personInfos,
        ).map(OrderEntity::getOrder)
    }
}