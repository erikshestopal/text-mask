import React from 'react'
import PropTypes from 'prop-types'
import createTextMaskInputElement
  from '../../core/src/createTextMaskInputElement'

export default class MaskedInput extends React.Component {
  constructor(...args) {
    super(...args)

    this.onBlur = this.onBlur.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  initTextMask() {
    const {props, props: {value}} = this

    this.textMaskInputElement = createTextMaskInputElement({
      inputElement: this.inputElement,
      ...props,
    })
    this.textMaskInputElement.update(value)
  }

  componentDidMount() {
    this.initTextMask()
  }

  componentDidUpdate() {
    this.initTextMask()
  }

  render() {
    const props = {...this.props}

    delete props.mask
    delete props.guide
    delete props.pipe
    delete props.placeholderChar
    delete props.keepCharPositions
    delete props.value
    delete props.onBlur
    delete props.onChange
    delete props.showMask

    return (
      <input
        {...props}
        onBlur={(event) => {this.onBlur(event) && console.log(event.target)}}
        onChange={this.onChange}
        defaultValue={this.props.value}
        ref={(inputElement) => (this.inputElement = inputElement)}
      />
    )
  }

  onChange(event) {
    this.textMaskInputElement.update()

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(event)
    }
  }

  onBlur(event) {
    if (typeof this.props.onBlur === 'function') {
      this.props.onBlur(event)
    }
  }
}

MaskedInput.propTypes = {
  mask: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.func,
    PropTypes.bool,
    PropTypes.shape({
      mask: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
      pipe: PropTypes.func,
    }),
  ]).isRequired,
  guide: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  pipe: PropTypes.func,
  placeholderChar: PropTypes.string,
  keepCharPositions: PropTypes.bool,
  showMask: PropTypes.bool,
}

export {default as conformToMask} from '../../core/src/conformToMask.js'
