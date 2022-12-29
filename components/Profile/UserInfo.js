import FormInput from "../FormInput";

const UserInfo = (props) => {
  return (
    <form className={props.styles.form} onSubmit={props.handleFormSubmit}>
      {props.inputs.map((input) => (
        <FormInput
          key={input.id}
          {...input}
          value={props.userData[input.name]}
          onChange={props.onChange}
          disabled={props.disableField}
          styles={props.styles}
        />
      ))}

      <label className={props.styles.label}>
        <span>Catégorie: </span>
        <select
          name="category"
          value={props.userData.category}
          onChange={props.onChange}
          disabled={props.disableField}
        >
          <option value="Joueur">Joueur</option>
          <option value="Entraineur">Entraineur</option>
        </select>
      </label>

      {props.disableField ? (
        // Fields are disabled and buttons are displayed
        <button
          className={props.styles.edit}
          type="button"
          onClick={props.editUserData}
        >
          Editer mes informations
        </button>
      ) : (
        <>
          {/* Fields are enabled and buttons are displayed */}
          <button className={props.styles.save} type="submit">
            Enregistrer
          </button>
        </>
      )}
    </form>
  );
};

export default UserInfo;
