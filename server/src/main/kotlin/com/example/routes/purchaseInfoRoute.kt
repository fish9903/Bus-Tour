import com.example.models.Purchase
import com.example.models.purchaseStorage
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

// View
fun Route.purchaseInfoRoute() {
    route("server/purchaseInfo") {// bus 정보 출력(id, name, size)
        get("{id?}") {
            if (purchaseStorage.isNotEmpty()) {
                val id: String? = call.parameters["id"]
                val purchase = purchaseStorage.find { it.id.toString() == id } ?: return@get call.respondText(
                    "No purchase with id $id",
                )
                call.respond(purchase)
            } else {
                call.respond("purchase is empty")
            }
        }
        post {
            val purchase = call.receive<Purchase>()
            purchaseStorage.add(purchase)
            call.respondText("purchase stored correctly")
        }
    }
}