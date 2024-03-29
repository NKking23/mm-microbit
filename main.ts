bluetooth.onBluetoothConnected(function () {
    music.play(music.stringPlayable("C E G C5 C5 G C5 C5 ", 250), music.PlaybackMode.InBackground)
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
    music.play(music.stringPlayable("C5 C5 G G E E C C ", 250), music.PlaybackMode.InBackground)
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
basic.showIcon(IconNames.No)
media.startMediaService()
mouse.startMouseService()
pins.touchSetMode(TouchTarget.P0, TouchTargetMode.Resistive)
pins.touchSetMode(TouchTarget.P1, TouchTargetMode.Resistive)
pins.touchSetMode(TouchTarget.P2, TouchTargetMode.Resistive)
pins.touchSetMode(TouchTarget.LOGO, TouchTargetMode.Capacitive)
basic.forever(function () {
    while (input.pinIsPressed(TouchPin.P2)) {
        led.plot(1, 0)
        if (50 > input.acceleration(Dimension.X) || -50 < input.acceleration(Dimension.X)) {
            mouse.movexy(input.acceleration(Dimension.X) / 20, 0)
        }
        if (50 > input.acceleration(Dimension.Y) || -50 < input.acceleration(Dimension.Y)) {
            mouse.movexy(0, input.acceleration(Dimension.Y) / 20)
        }
    }
    led.unplot(1, 0)
})
basic.forever(function () {
    while (input.buttonIsPressed(Button.A)) {
        media.sendCode(media.keys(media._MediaKey.vol_down))
    }
    while (input.buttonIsPressed(Button.B)) {
        media.sendCode(media.keys(media._MediaKey.vol_up))
    }
})
