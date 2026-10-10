import Foundation
import AppKit

let fileManager = FileManager.default
let currentDir = fileManager.currentDirectoryPath
let outputDir = "\(currentDir)/public/test-flyers"

try? fileManager.createDirectory(atPath: outputDir, withIntermediateDirectories: true, attributes: nil)

struct TestFlyerConfig {
    let filename: String
    let catererName: String
    let sourceFlyer: String
    let themeColor: NSColor
    let bannerText: String
}

let configs = [
    TestFlyerConfig(
        filename: "test-bajibhai",
        catererName: "Bajibhai Catering",
        sourceFlyer: "\(currentDir)/public/flyers/bajibhai.jpeg",
        themeColor: NSColor(red: 0.92, green: 0.35, blue: 0.05, alpha: 1.0),
        bannerText: "⚠️ TEST MENU — Bajibhai Catering"
    ),
    TestFlyerConfig(
        filename: "test-royal-exotic",
        catererName: "Royal Exotic Catering",
        sourceFlyer: "\(currentDir)/public/flyers/royal-exotic.jpeg",
        themeColor: NSColor(red: 0.45, green: 0.15, blue: 0.75, alpha: 1.0),
        bannerText: "⚠️ TEST MENU — Royal Exotic Catering"
    ),
    TestFlyerConfig(
        filename: "test-al-hashmi",
        catererName: "Al-Hashmi's Kitchen",
        sourceFlyer: "\(currentDir)/public/flyers/al-hashmi.jpeg",
        themeColor: NSColor(red: 0.02, green: 0.50, blue: 0.35, alpha: 1.0),
        bannerText: "⚠️ TEST MENU — Al-Hashmi's Kitchen"
    )
]

for cfg in configs {
    print("Generating \(cfg.filename)...")
    
    // Load original image if available, else create standard canvas
    let baseImage = NSImage(contentsOfFile: cfg.sourceFlyer)
    let width: CGFloat = baseImage?.size.width ?? 800
    let height: CGFloat = baseImage?.size.height ?? 1100
    let size = NSSize(width: width, height: height)
    
    let canvas = NSImage(size: size)
    canvas.lockFocus()
    
    if let img = baseImage {
        img.draw(in: NSRect(origin: .zero, size: size))
    } else {
        NSColor(red: 0.97, green: 0.97, blue: 0.98, alpha: 1.0).setFill()
        NSRect(origin: .zero, size: size).fill()
    }
    
    // Top Warning Banner
    let bannerHeight: CGFloat = 85
    let bannerRect = NSRect(x: 0, y: height - bannerHeight, width: width, height: bannerHeight)
    
    // Yellow/Amber alert background
    NSColor(red: 0.98, green: 0.80, blue: 0.08, alpha: 0.96).setFill()
    bannerRect.fill()
    
    // Warning Border Bottom
    NSColor(red: 0.85, green: 0.35, blue: 0.05, alpha: 1.0).setFill()
    NSRect(x: 0, y: height - bannerHeight, width: width, height: 5).fill()
    
    // Banner Text
    let paragraphStyle = NSMutableParagraphStyle()
    paragraphStyle.alignment = .center
    
    let font = NSFont.boldSystemFont(ofSize: min(28, width * 0.045))
    let attrs: [NSAttributedString.Key: Any] = [
        .font: font,
        .foregroundColor: NSColor(red: 0.45, green: 0.15, blue: 0.05, alpha: 1.0),
        .paragraphStyle: paragraphStyle
    ]
    
    let subFont = NSFont.systemFont(ofSize: min(16, width * 0.028), weight: .semibold)
    let subAttrs: [NSAttributedString.Key: Any] = [
        .font: subFont,
        .foregroundColor: NSColor(red: 0.35, green: 0.20, blue: 0.05, alpha: 1.0),
        .paragraphStyle: paragraphStyle
    ]
    
    let titleString = NSAttributedString(string: cfg.bannerText, attributes: attrs)
    let subString = NSAttributedString(string: "FOR UPLOAD FLOW TESTING • PREVIEW OVERWRITE", attributes: subAttrs)
    
    let textRect = NSRect(x: 10, y: height - 52, width: width - 20, height: 35)
    titleString.draw(in: textRect)
    
    let subRect = NSRect(x: 10, y: height - 78, width: width - 20, height: 22)
    subString.draw(in: subRect)
    
    // Center Floating Stamp Badge
    let stampWidth: CGFloat = min(360, width * 0.75)
    let stampHeight: CGFloat = 70
    let stampRect = NSRect(x: (width - stampWidth) / 2, y: height * 0.45, width: stampWidth, height: stampHeight)
    
    let stampPath = NSBezierPath(roundedRect: stampRect, xRadius: 16, yRadius: 16)
    NSColor(red: 0.98, green: 0.25, blue: 0.25, alpha: 0.92).setFill()
    stampPath.fill()
    NSColor.white.setStroke()
    stampPath.lineWidth = 3
    stampPath.stroke()
    
    let stampAttrs: [NSAttributedString.Key: Any] = [
        .font: NSFont.boldSystemFont(ofSize: 22),
        .foregroundColor: NSColor.white,
        .paragraphStyle: paragraphStyle
    ]
    let stampText = NSAttributedString(string: "TEST SIMULATION FLYER", attributes: stampAttrs)
    stampText.draw(in: NSRect(x: stampRect.origin.x, y: stampRect.origin.y + 20, width: stampWidth, height: 30))
    
    canvas.unlockFocus()
    
    // Export PNG and JPG
    if let tiff = canvas.tiffRepresentation,
       let rep = NSBitmapImageRep(data: tiff) {
        
        if let pngData = rep.representation(using: .png, properties: [:]) {
            let pngPath = "\(outputDir)/\(cfg.filename).png"
            try? pngData.write(to: URL(fileURLWithPath: pngPath))
            print("Saved: \(pngPath) (\(pngData.count / 1024) KB)")
        }
        
        if let jpgData = rep.representation(using: .jpeg, properties: [.compressionFactor: 0.9]) {
            let jpgPath = "\(outputDir)/\(cfg.filename).jpg"
            try? jpgData.write(to: URL(fileURLWithPath: jpgPath))
            print("Saved: \(jpgPath) (\(jpgData.count / 1024) KB)")
        }
    }
}

print("All 3 test flyers generated successfully in \(outputDir)")
