import { useRef, useEffect, useState } from 'react'
import { fabric } from 'fabric'

import DownloadArrow from './global/svg/DownloadArrow'

import styles from '@/styles/Home.module.css'

const Board = () => {

  const canvasRef = useRef(null)
  const [penWidth, setPenWidth] = useState(1)
  const [penColor, setPenColor] = useState('#000000')
  const [fabricCanvas, setFabricCanvas] = useState()
  const [screenWidth, setScreenWidth] = useState(null)
  const [toggleEraser, setToggleEraser] = useState(false)

  const defaultCanvasColor = '#dcdde1'

  useEffect(() => {
    setScreenWidth(window.innerWidth)
    const canvas = new fabric.Canvas(canvasRef.current, {
      backgroundColor: defaultCanvasColor,
      width: screenWidth * .9,
      height: 500,
      isDrawingMode: true,
      selectionColor: `#0652dd`,
      selectionLineWidth: 4,
      borderRadius: 10,
    })
    setFabricCanvas(canvas)

    return () => {
      canvas.dispose()
    }
  }, [canvasRef, screenWidth])

  const changePenWidth = width => {
    const roundUpWidth = Math.round(width)
    if (fabricCanvas) {
      fabricCanvas.freeDrawingBrush.width = roundUpWidth
      setPenWidth(roundUpWidth)
      fabricCanvas.renderAll.bind(fabricCanvas)
    }
    setPenWidth()
  }

  const changePenColor = color => {
    if (fabricCanvas) {
      fabricCanvas.freeDrawingBrush.color = color
      setPenColor(color)
    }
  }

  const downloadBoard = () => {
    const pngData = fabricCanvas.toDataURL({multiplier: 3},'png')
    const downloadLink = document.createElement('a')
    const fileName = `whiteboard-session-${Date.now()}_${Math.random().toString().replace('.','')}.png`

    downloadLink.href = pngData
    downloadLink.download = fileName
    downloadLink.click()
  }

  const clearCanvas = () => {
    if (fabricCanvas) {
      fabricCanvas.clear()
      fabricCanvas.backgroundColor = defaultCanvasColor
    }
  }

  // // Keyboard event listeners for undo/redo actions
  // document.addEventListener('keyup', ({ keyCode, ctrlKey } = event) => {
  //   // Check Ctrl key is pressed.
  //   if (!ctrlKey) {
  //     return
  //   }
  //   // Check pressed button is Z - Ctrl+Z.
  //   if (keyCode === 90) {
  //     fabricCanvas.undo()
  //   }
  //   // Check pressed button is Y - Ctrl+Y.
  //   if (keyCode === 89) {
  //     fabricCanvas.redo()
  //   }
  // })

  const toggleErase = () => {
    if (fabricCanvas && toggleEraser) {
      fabricCanvas.freeDrawingBrush.color = penColor
      setToggleEraser(!toggleEraser)
    } else if ( fabricCanvas && penColor !== defaultCanvasColor) {
      fabricCanvas.freeDrawingBrush.color = defaultCanvasColor
      setToggleEraser(!toggleEraser)
    } else {
      console.error(`No canvas available.`)
    }
  }

  return (
    <div className='whiteboard container w-full h-full mx-auto mt-11'>
      <section className='tools-container w-11/12 mx-auto mt-11'>
        <h2 className='py-2'>
          <strong>Whiteboard Tools:</strong>
        </h2>
        <div className='tools-wrapper flex flex-wrap space-x-5'>
          <div className='tool-wrapper'>
            <label htmlFor='PenWidth'>
              <strong>Stylus Width:</strong>
            </label>
            <h3 className='stylus-width min'>1px</h3>
            <input 
              type='range'
              id='PenWidth' 
              onChange={e => changePenWidth(e.target.value)} 
              value={penWidth}
              min={1}
              max={30}/>
            <h3 className='stylus-width min'>30px</h3>
          </div>
          <div className='tool-wrapper'>
            <label htmlFor='PenColor'>
              <strong>Pen Color:</strong>
            </label>
            <input 
              type='color' 
              id='PenColor' 
              onChange={e => changePenColor(e.target.value)} 
              value={penColor}
              min={1}
              max={30}/>
          </div>
          <div className='tool-wrapper'>
            <div className='relative inline-block w-10 align-middle select-none transition duration-200 ease-in'>
              <input 
                onChange={() => toggleErase()}
                type='checkbox' 
                name='toggle' 
                id='toggle'
                className='toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer'/>
              <label
                htmlFor='toggle' 
                className='toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer'>
              </label>
            </div>
            <label htmlFor='toggle'>
              <strong>Toggle Eraser</strong>
            </label>
          </div>
          <div className='btn-actions'>
            <button 
              id='DownloadBoard'
              onClick={() => downloadBoard()}
              type='button'
              className='green flex align-middle'>
              <DownloadArrow/>&nbsp;Whiteboard
            </button>
            <button 
              id='DownloadBoard'
              onClick={() => clearCanvas()}
              type='button'
              className='red'>
              Clear Board
            </button>
            {/* <div className='undo-btns'>
              <button 
                id='DownloadBoard'
                onClick={() => fabricCanvas.undo()}
                type='button'
                className='green'>
                Undo
              </button>
              <button 
                id='DownloadBoard'
                onClick={() => fabricCanvas.redo()}
                type='button'
                className='red'>
                Redo
              </button>
            </div> */}
          </div>
        </div>
      </section>
      <canvas id='Whiteboard' ref={canvasRef} className='mx-auto'></canvas>
    </div>
  )
}

export default Board