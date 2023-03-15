bluetooth.onBluetoothConnected(function () {
    basic.showLeds(`
        . . # # .
        # . # . #
        . # # # .
        # . # . #
        . . # # .
        `)
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.No)
})
input.onPinReleased(TouchPin.P1, function () {
    if (input.acceleration(Dimension.X) < 0) {
        mouse.click()
    } else if (input.acceleration(Dimension.X) > 0) {
        mouse.rightClick()
    }
})
input.onLogoEvent(TouchButtonEvent.Released, function () {
    media.sendCode(media.keys(media._MediaKey.playPause))
})
media.startMediaService()
mouse.startMouseService()
pins.touchSetMode(TouchTarget.P0, TouchTargetMode.Capacitive)
pins.touchSetMode(TouchTarget.P1, TouchTargetMode.Capacitive)
pins.touchSetMode(TouchTarget.P2, TouchTargetMode.Capacitive)
pins.touchSetMode(TouchTarget.LOGO, TouchTargetMode.Capacitive)
basic.forever(function () {
    while (input.pinIsPressed(TouchPin.P2)) {
        if (50 > input.acceleration(Dimension.X) || -50 < input.acceleration(Dimension.X)) {
            mouse.movexy(input.acceleration(Dimension.X) / 20, 0)
        }
        if (50 > input.acceleration(Dimension.Y) || -50 < input.acceleration(Dimension.Y)) {
            mouse.movexy(0, input.acceleration(Dimension.Y) / 20)
        }
    }
})
basic.forever(function () {
    while (input.buttonIsPressed(Button.A)) {
        media.sendCode(media.keys(media._MediaKey.vol_down))
    }
    while (input.buttonIsPressed(Button.B)) {
        media.sendCode(media.keys(media._MediaKey.vol_up))
    }
})
