package com.example.hotelbuisnesslayer.Util

sealed interface IResults<out D,out E: enNetworkError> {
    data class Secessfull<out E>(val dataResult:E): IResults<E, Nothing>
    data class Error<out E: enNetworkError>(val dataResult:E): IResults<Nothing, E>

}