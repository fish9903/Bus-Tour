package com.example.entity

import kotlinx.serialization.Serializable
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.javatime.datetime

/**
 * 프로그램 엔티티에 대한 테이블 정의
 * @property dep_date 출발일
 * @property ariv_date 도착일
 * @property state 프로그램의 상태(결제 가능, 결제 불가, 좌석 매진의 상태 구분)
 * @property max_count 최대 좌석 수
 * @property rem_count 남은 좌석 수. 이 값이 0이 되면 예약이 불가능. + state -> 매진 상태
 * @property course (cid: 외래키). 프로그램에 연결된 코스를 의미(외래키)
 */
object Programs : IntIdTable() {

    val dep_date = datetime("dep_date")
    val ariv_date = datetime("ariv_date")
    val state = varchar("state", 10)
    val max_count = integer("max_count")
    val rem_count = integer("rem_count")

    val course = reference("cid", Courses)

    init {
        check {
            max_count greaterEq 0
        }

        check {
            rem_count greaterEq 0
        }
    }
}


class ProgramEntity(id: EntityID<Int>): IntEntity(id) {
    companion object: IntEntityClass<ProgramEntity>(Programs)

    var dep_date by Programs.dep_date
    var ariv_date by Programs.ariv_date
    var state by Programs.state
    var max_count by Programs.max_count
    var rem_count by Programs.rem_count

    var course by CourseEntity referencedOn Programs.course
    // 남의 엔티티 / 자기꺼로 가리키기


    fun getProgram() = Program(
        this.id.value,
        this.dep_date.toString(),
        this.ariv_date.toString(),
        this.state,
        this.max_count,
        this.rem_count,
        this.course.id.toString().toInt()
    )

    fun getProgramWithCid() = Program(
        this.id.value,
        this.dep_date.toString(),
        this.ariv_date.toString(),
        this.state,
        this.max_count,
        this.rem_count,
        this.course.id.value
    )
}


@Serializable
data class Program(
    val id: Int,
    val dep_date: String,
    val ariv_date: String,
    val state: String,
    val max_count: Int,
    val rem_count: Int,
    val cid: Int
)

