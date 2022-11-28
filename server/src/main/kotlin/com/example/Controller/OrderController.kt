package com.example.Controller

import com.example.entity.*
import com.example.entity.Personinfos.count
import com.example.entity.Personinfos.type
import org.jetbrains.exposed.dao.entityCache
import org.jetbrains.exposed.dao.flushCache
import org.jetbrains.exposed.dao.with
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.and
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.transactions.transaction
import org.jetbrains.exposed.sql.update
import java.time.LocalDateTime

class OrderController {
    // order 추가
    fun addOrder(order: Order, programId: Int, userName: String): OrderEntity = transaction {
        val user = UserEntity.find { Users.name eq userName }.find { it.name == userName }!!

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
        for (i: Int in 0 until size) {
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

    fun addOrder2(
        price: Int,
        card_number: String,
        program: ProgramEntity,
        user: UserEntity,
        personinfos: MutableList<Personinfo>
    ): OrderEntity = transaction{
        val charset = ('A'..'Z') + ('a'..'z') + ('0'..'9');
        val qrpath = (1..15).map { charset.random() }.joinToString("")

        val order = OrderEntity.new {
            this.ordered_date = LocalDateTime.now();
            this.up_date = LocalDateTime.now();
            this.state = "ok";
            this.QRCode = "http://some-path/QRCode/${qrpath}";
            this.total_price = price
            this.card_number = card_number
            this.program = program
            this.user = user
        }

        personinfos.forEach { it ->
            PersoninfoEntity.new {
                type = it.type;
                count = it.count;
                price_pp = it.price_pp;
                oid = order;
            }
        }

        return@transaction order;
    }

    fun getAll(): Iterable<Order> = transaction {
        OrderEntity.all().with(
            OrderEntity::personInfos,
        ).map(OrderEntity::getOrder)
    }

    fun getAll(id: Int): Array<Order?> = transaction {
        val count = Orders.select { Orders.user eq id }.count().toInt()
        val arr = Array<Order?>(count) { null }

        var i = 0
        Orders.select { Orders.user eq id }.forEach {
            var temp = OrderEntity.findById(it[Orders.id])
            if (temp != null) {
                arr[i] = temp.getOrder()
                i++
            }
        }

        return@transaction arr
    }

    fun refundAll(order: Order) = transaction {
        Orders.update({ Orders.id eq order.id.toInt() }) {
            it[state] = "expired"
        }
        val size: Int = order.personinfos.size
        var personCount: Int = 0
        for (i: Int in 0 until size) {
            personCount += order.personinfos[i].count
        }
        Orders.select { Orders.id eq order.id.toInt() }.forEach {
            val program = ProgramEntity.findById(it[Orders.program])
            // 남은 좌석 갱신
            if (program != null) {
                program.rem_count = program.rem_count + personCount
            }
        }
    }

    fun refund(order: Order, p1: Int, p2: Int, p3: Int, difference: Int) = transaction {
        var totalPrice = 0
        Orders.select{ Orders.id eq order.id.toInt() }.forEach {
            val program = ProgramEntity.findById(it[Orders.program])
            if (program != null) {
                // 남은 좌석 갱신
                val calculate = program.rem_count + difference
                Programs.update({ Programs.id eq it[Orders.program] }) {
                    it[rem_count] = calculate
                }

                // total price 변경
                val price = CourseEntity.findById(program.course.id)?.getCourseWithPrograms()?.priceinfos
                totalPrice = totalPrice + price?.get(0)!!.price * p1
                totalPrice = totalPrice + price?.get(1)!!.price * p2
                totalPrice = totalPrice + price?.get(2)!!.price * p3

                Orders.update({Orders.id eq order.id.toInt()}) {
                    it[total_price] = totalPrice
                }

                // 해당 order의 personinfo 변경
                Personinfos.update({ Personinfos.order eq order.id.toInt() and (Personinfos.type eq "p1") } ) {
                    it[count] = p1
                }
                Personinfos.update({ Personinfos.order eq order.id.toInt() and (Personinfos.type eq "p2") } ) {
                    it[count] = p2
                }
                Personinfos.update({ Personinfos.order eq order.id.toInt() and (Personinfos.type eq "p3") } ) {
                    it[count] = p3
                }
            }
        }
    }
}