import kotlinx.serialization.Serializable

@Serializable
data class Customer (val id: Int, val Name: String, val phoneNumber: String, val email: String)

var customerStorage = mutableListOf<Customer>()