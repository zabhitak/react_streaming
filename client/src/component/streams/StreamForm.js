import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends React.Component {
  rendererror=(abhi)=> {
    //another way of writing
    if (abhi.touched && abhi.error) {
      return(
      <div className="ui error message">
        <div className="header">{abhi.error}</div>
      </div>
      );
    }
  }

  // renderInput = (abhi) => {
  //   // console.log(abhi);
  //   // console.log(abhi.meta);
  //   // return <input onChange={abhi.input.onChange} value={abhi.input.value} />;
  //   return (
  //     <div className="field">
  //       <label>{abhi.label}</label>
  //       <input {...abhi.input} />
  //       <div>{this.rendererror(abhi.meta)}</div>
  //     </div>
  //   );
  // };

  renderInput = ({input,label,meta}) => {
    // console.log(abhi);
    // console.log(abhi.meta);
    // return <input onChange={abhi.input.onChange} value={abhi.input.value} />;
    const className = `field ${meta.error && meta.touched ? 'error': ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} />
        <div>{this.rendererror(meta)}</div>
      </div>
    );
  };

  onSubmit = (formValues) => {
    // console.log(formValues);
    this.props.onSubmit(formValues);
  };

  render() {
    // console.log(this.props);
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.title) {
    errors.title = "You must enter a title";
  }
  if (!formValues.description) {
    errors.description = "You must enter a description";
  }
  return errors;
};

export default reduxForm({
  form: "stream_form_by_me",
  validate: validate
})(StreamForm);

