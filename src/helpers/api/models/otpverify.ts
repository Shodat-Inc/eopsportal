import { DataTypes } from "sequelize";
export function otpVerify(sequelize: {
  define: (
    arg0: string,
    arg1: {
      id: {
        type: DataTypes.IntegerDataTypeConstructor;
        primaryKey: boolean;
        allowNull: boolean;
        autoIncrement: boolean;
      };
      email: {
        type: DataTypes.StringDataTypeConstructor;
        allowNull: boolean;
      };
      type: {
        type: DataTypes.StringDataTypeConstructor;
        allowNull: boolean;
      };
      otp: {
        type: DataTypes.IntegerDataTypeConstructor;
        allowNull: boolean;
      };
      isVerified: {
        type: DataTypes.AbstractDataTypeConstructor;
        allowNull: boolean;
      };

    }
  ) => any;
}) {
  const attributes: any = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    otp: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue:false,
    }
  };

  return sequelize.define("OtpVerify", attributes);
}
