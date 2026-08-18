import { useNavigate } from "react-router-dom";
import { Database, ChevronRight } from "lucide-react";
import { entityGroups } from "../../config/entityConfigs";

export default function DataPage() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-header-row">
          <Database size={28} className="page-header-icon" />
          <div>
            <h1>Data Management</h1>
            <p>Browse, create, edit, and delete database records</p>
          </div>
        </div>
      </div>

      {entityGroups.map((group) => (
        <div key={group.group} className="data-group">
          <div className="data-group-header">
            <group.icon size={20} />
            <h2>{group.group}</h2>
          </div>
          <div className="data-entity-grid">
            {group.entities.map((entity) => (
              <button
                key={entity.key}
                className="data-entity-card"
                onClick={() => navigate(`/app/data/${entity.key}`)}
              >
                <div className="data-entity-card-body">
                  <span className="data-entity-name">{entity.labelPlural}</span>
                  <span className="data-entity-desc">
                    {entity.fields.length} fields
                  </span>
                </div>
                <ChevronRight size={18} className="data-entity-arrow" />
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
