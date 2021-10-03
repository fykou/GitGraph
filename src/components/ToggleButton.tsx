import { useEffect, useState } from 'react'

interface IToggleButtonProps {
  buttonId: string
  setFunc: (toggled: boolean) => void
  text?: string
  className?: string
}

export function ToggleButton(props: IToggleButtonProps) {
  const [toggled, setToggle] = useState(false)

  const toggle = () => {
    if (toggled) {
      setToggle(false)
    } else {
      setToggle(true)
    }
  }

  const saveToLocalStorage = () => {
    window.localStorage.setItem(
      'buttonToggled_id:_' + props.buttonId,
      JSON.stringify(toggled)
    )
  }

  const fetchFromLocalStorage = () => {
    const buttonToggledString = window.localStorage.getItem(
      'buttonToggled_id:_' + props.buttonId
    )
    if (buttonToggledString) {
      setToggle(JSON.parse(buttonToggledString))
    }
  }

  useEffect(() => {
    fetchFromLocalStorage()
  }, [])

  useEffect(() => {
    saveToLocalStorage()
    try {
      props.setFunc(toggled)
    } catch (Exception) {
      console.warn('No function provided to setFunc')
    }
  }, [toggled])

  return (
    <div data-testid="testToggle">
      <div className={`flex items-center justify-start w-full mb-12 ${props.className ? props.className : ""}`}>
        <label htmlFor="toggleB" className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              onClick={() => toggle()}
              id="toggleB"
              className="sr-only"
              checked={toggled}
              readOnly={true}
              data-testid="testSwitch"
            />
            <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>

            <div
              id="dot"
              className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"
            ></div>
          </div>
          <div className="ml-3 text-gray-100 font-medium">
            {props.text ? props.text : ''}
          </div>
        </label>
      </div>
    </div>
  )
}
