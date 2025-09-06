import { XCircle, CheckCircle } from "lucide-react";
function PasswordRules({ password, rules }) {
  return (
    <ul className="text-sm mt-2 space-y-1">
      {rules.map((rule, i) => {
        const valid = rule.regex.test(password);
        return (
          <li
            key={i}
            className={`flex items-center gap-2 ${valid ? "text-green-600" : "text-gray-500"}`}
          >
            <span className="text-lg">{valid ? <CheckCircle /> : <XCircle />}</span>
            {rule.label}
          </li>
        );
      })}
    </ul>
  );
}

export default PasswordRules;
