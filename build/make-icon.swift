import AppKit

let S: CGFloat = 1024
let img = NSImage(size: NSSize(width: S, height: S))
img.lockFocus()
let ctx = NSGraphicsContext.current!.cgContext

// Carré arrondi façon macOS (marge de 100px)
let rect = NSRect(x: 100, y: 100, width: 824, height: 824)
let shape = NSBezierPath(roundedRect: rect, xRadius: 185, yRadius: 185)

// Ombre portée
ctx.saveGState()
ctx.setShadow(offset: CGSize(width: 0, height: -12), blur: 30, color: NSColor.black.withAlphaComponent(0.35).cgColor)
NSColor(red: 0.75, green: 0.1, blue: 0.12, alpha: 1).setFill()
shape.fill()
ctx.restoreGState()

// Dégradé rouge
shape.addClip()
NSGradient(colors: [NSColor(red: 0.96, green: 0.33, blue: 0.24, alpha: 1),
                    NSColor(red: 0.72, green: 0.07, blue: 0.13, alpha: 1)])!.draw(in: rect, angle: -90)

// Reflet "verre" sur le haut
let gloss = NSBezierPath(ovalIn: NSRect(x: -60, y: 560, width: 1144, height: 620))
NSGradient(colors: [NSColor.white.withAlphaComponent(0.32), NSColor.white.withAlphaComponent(0.03)])!.draw(in: gloss, angle: -90)

// Caractère 拼
let para = NSMutableParagraphStyle(); para.alignment = .center
func draw(_ s: String, font: NSFont, y: CGFloat, alpha: CGFloat) {
  let shadow = NSShadow(); shadow.shadowColor = NSColor.black.withAlphaComponent(0.25)
  shadow.shadowOffset = NSSize(width: 0, height: -6); shadow.shadowBlurRadius = 14
  let attrs: [NSAttributedString.Key: Any] = [.font: font, .foregroundColor: NSColor.white.withAlphaComponent(alpha),
                                              .paragraphStyle: para, .shadow: shadow]
  NSAttributedString(string: s, attributes: attrs).draw(in: NSRect(x: 100, y: y, width: 824, height: font.pointSize * 1.3))
}
draw("拼", font: NSFont(name: "Hiragino Sans GB W6", size: 470) ?? NSFont.boldSystemFont(ofSize: 470), y: 225, alpha: 1)
draw("pīn", font: NSFont.systemFont(ofSize: 150, weight: .semibold), y: 150, alpha: 0.92)

img.unlockFocus()
let rep = NSBitmapImageRep(data: img.tiffRepresentation!)!
try! rep.representation(using: .png, properties: [:])!.write(to: URL(fileURLWithPath: "icon.png"))
