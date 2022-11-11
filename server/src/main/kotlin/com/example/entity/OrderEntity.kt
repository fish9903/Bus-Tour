package com.example.entity

import kotlinx.serialization.Serializable
import org.jetbrains.exposed.dao.UUIDEntity
import org.jetbrains.exposed.dao.UUIDEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.UUIDTable
import org.jetbrains.exposed.sql.javatime.datetime
import java.time.LocalDateTime
import java.util.UUID

/**
 * 오더 엔티티에 대한 테이블 정의
 * @property ordered_date 주문한 날짜
 * @property up_date 주문이 갱신된 날짜
 * @property state 주문의 상태(결제됨, 변경, 취소 등)
 * @property QRCode 주문한 표에 대한 QR 코드
 * @property total_price 주문한 전체 가격
 * @property card_number 주문에 사용한 카드 번호
 * @property user (uid: 외래키). 오더에 연결된 유저를 의미
 * @property program (pid: 외래키). 오더에 연결된 프로그램을 의미
 */
object Orders : UUIDTable() {
    val ordered_date = datetime("ordered_date")
    val up_date = datetime("up_date").nullable()
    val state = varchar("state", 10)
    val QRCode = varchar("qrcode", 100)
    val total_price = integer("total_price")
    val card_number = varchar("card_number", 16)

    val user = reference("uid", Users)
    val program = reference("pid", Programs)

    init {
        check {
            total_price greaterEq 0
        }

        check {
            card_number regexp "[0-9]{14,16}"
        }
    }
}

// 엔티티 영역
class OrderEntity(id: EntityID<UUID>) : UUIDEntity(id) {
    companion object : UUIDEntityClass<OrderEntity>(Orders)

    var ordered_date by Orders.ordered_date
    var up_date by Orders.up_date
    var state by Orders.state
    var QRCode by Orders.QRCode
    var total_price by Orders.total_price
    var card_number by Orders.card_number

    //참조하는 놈은 vaL
    val personInfos by PersoninfoEntity referrersOn Personinfos.order
    var user by UserEntity referencedOn Orders.user
    var program by ProgramEntity referencedOn Orders.program
    /**
     * Order data 클래스에 대한 뷰를 반환합니다.
     * @return Order data class{id, ordered_date, state, QRCode, personInfos}
     */
    fun getOrder() = Order(
        this.id.toString(),
        this.ordered_date.toString(),
        this.up_date?.toString() ?: "",
        this.state,
        this.QRCode,
        this.total_price,
        this.card_number,
        personInfos.map {
            it.getPersonInfo()
        }
    )
}

// 데이터 영역
@Serializable
data class Order(
    val id: String,
    val ordered_date: String,
    val up_date: String?,
    val state: String,
    val QRcode: String,
    val total_price: Int,
    val card_number: String,
    val personinfos: List<Personinfo>
)