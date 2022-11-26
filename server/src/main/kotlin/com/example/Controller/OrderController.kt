package com.example.Controller

import com.example.entity.Order
import com.example.entity.OrderEntity
import org.jetbrains.exposed.sql.transactions.transaction
import java.time.LocalDateTime
import java.util.*

class OrderController {
    // order 추가
    fun addOrder(order: Order) = transaction {
        OrderEntity.new {
            this.ordered_date = LocalDateTime.parse(order.ordered_date)
            this.up_date = LocalDateTime.parse(order.up_date)
            this.state = order.state
            this.QRCode = order.QRcode
            this.total_price = order.total_price
            this.card_number = order.card_number
            this.uid =
            this.pid =
        }
    }
}